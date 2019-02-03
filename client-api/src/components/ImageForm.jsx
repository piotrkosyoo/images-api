import React, {Component} from 'react';
import {Progress} from 'semantic-ui-react'
import {Grid} from 'semantic-ui-react'
import {Label} from 'semantic-ui-react'
import {Input} from 'semantic-ui-react'
import {Modal, Header} from 'semantic-ui-react'

import {ToastContainer, ToastStore} from 'react-toasts';

import getImage from '../services/imageService';

class ImageForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            zoom: 1,
            zoomSteep: 1,
            shiftX: 0,
            shiftY: 0,
            shiftStepX: 1,
            shiftStepY: 1,
            imageBase64: null,
            isfetching: false
        };

        this.assign = this.assign.bind(this);
        this.sendRequestImage = this.sendRequestImage.bind(this);
        this.updateImage = this.updateImage.bind(this);
        this.setNewCords = this.setNewCords.bind(this);
        this.wheel = this.wheel.bind(this);
    }

    componentDidMount() {
        this.sendRequestImage();
    }

    wheel(e, zoom) {
        e.preventDefault();
        const newValue = zoom + Number(e.deltaY) / 100;
        ToastStore.info(`Zoom ${newValue}`);
        this.setState({zoom: newValue}, this.sendRequestImage);
    }

    sendRequestImage() {
        const {zoom, shiftX, shiftY, zoomSteep, shiftStepX, shiftStepY} = this.state;
        const params = `zoom=${zoom * zoomSteep}&ShiftX=${shiftX * shiftStepX}&ShiftY=${shiftY * shiftStepY}`;
        this.setState({ isfetching: true}, getImage(params, this.updateImage));
    }

    updateImage(image) {
        this.setState(image);
        this.setState({isfetching: false});
    }

    assign(property, value) {
        const newProperty = {};
        newProperty[property] = value;
        this.setState(newProperty, this.sendRequestImage);
    }

    setNewCords(e) {
        const positionInfo = e.target.getBoundingClientRect();
        const height = positionInfo.height;
        const width = positionInfo.width;
        const xPosition = e.clientX;
        const yPosition = e.clientY;
        const offsetLeft = e.target.offsetLeft;
        const offsetTop = e.target.offsetTop;
        const cordsX = xPosition - width / 2 - offsetLeft;
        const cordsY = yPosition - height / 2 - offsetTop + window.pageYOffset;
        this.assign('shiftX', Number(cordsX + this.state.shiftX));
        this.assign('shiftY', Number(cordsY + this.state.shiftY));
    }

    render() {
        const {zoom, shiftX, shiftY, zoomSteep, shiftStepX, shiftStepY, imageBase64} = this.state;
        return (
            <div>
                <Modal open={this.state.isfetching} basic>
                    <Header icon='archive' content='Loading' />
                    <Modal.Content>
                        <p>
                            Data loading
                        </p>
                    </Modal.Content>
                </Modal>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={3}>
                            <Input icon='user' iconPosition='left' type='number' placeholder='Zoom step' id="zoomSteep"
                                   defaultValue={zoomSteep}
                                   onChange={(e, data) => this.assign(e.target.id, Number(data.value))}
                            />
                            <Label as='a' color='teal' tag>
                                Zoom step
                            </Label>
                        </Grid.Column>
                        <Grid.Column width={3}>
                            <Input icon='user' iconPosition='left' type='number' placeholder='Zoom' id="zoom"
                                   value={zoom} onChange={(e, data) => this.assign(e.target.id, Number(data.value))}
                            />
                            <Label as='a' color='teal' tag>
                                Zoom {zoom * zoomSteep}
                            </Label>
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <Progress progress='value' value={zoom * zoomSteep}/>
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                        <Grid.Column width={3}>
                            <Input icon='user' iconPosition='left' type='number' placeholder='Shift StepX'
                                   id="shiftStepX"
                                   defaultValue={shiftStepX}
                                   onChange={(e, data) => this.assign(e.target.id, Number(data.value))}
                            />
                            <Label as='a' color='teal' tag>
                                ShiftX Step
                            </Label>
                        </Grid.Column>
                        <Grid.Column width={3}>
                            <Input icon='user' iconPosition='left' type='number' placeholder='StepX' id="shiftX"
                                   value={shiftX} onChange={(e, data) => this.assign(e.target.id, Number(data.value))}
                            />
                            <Label as='a' color='teal' tag>
                                ShiftX {shiftX * shiftStepX}
                            </Label>
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <Progress progress='value' value={shiftX * shiftStepX}/>
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                        <Grid.Column width={3}>
                            <Input icon='user' iconPosition='left' type='number' placeholder='Shift Step Y'
                                   id="shiftStepY"
                                   defaultValue={shiftStepY}
                                   onChange={(e, data) => this.assign(e.target.id, Number(data.value))}
                            />
                            <Label as='a' color='teal' tag>
                                ShiftY Step
                            </Label>
                        </Grid.Column>
                        <Grid.Column width={3}>
                            <Input icon='user' iconPosition='left' type='number' placeholder='StepY' id="shiftY"
                                   value={shiftY} onChange={(e, data) => this.assign(e.target.id, Number(data.value))}
                            />
                            <Label as='a' color='teal' tag>
                                ShiftX {shiftY * shiftStepY}
                            </Label>
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <Progress progress='value' value={shiftY * shiftStepY}/>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <div onWheel={(e) => this.wheel(e, zoom)}>
                    <img src={imageBase64} onClick={(e) => this.setNewCords(e)}/>
                </div>
                <ToastContainer store={ToastStore}/>
            </div>
        );
    }
}

export default ImageForm;
