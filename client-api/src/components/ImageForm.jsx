import React, {Component} from 'react';
import {Progress} from 'semantic-ui-react'
import {Button} from 'semantic-ui-react'
import {Grid, Image} from 'semantic-ui-react'
import {Label} from 'semantic-ui-react'
import { Input } from 'semantic-ui-react'

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
            imageBase64: null
        };

        this.assign = this.assign.bind(this);
        this.sendRequestImage = this.sendRequestImage.bind(this);
        this.updateImage = this.updateImage.bind(this);
        this.wheel = this.wheel.bind(this)
    }

    componentDidMount() {
        this.sendRequestImage();
    }

    wheel(e, zoom) {
        e.preventDefault();
        const newValue = zoom + Number(e.deltaY)/100;
        this.setState({zoom: newValue}, this.sendRequestImage);
    }

    sendRequestImage() {
        const {zoom, shiftX, shiftY, zoomSteep, shiftStepX, shiftStepY} = this.state;
        const params = `zoom=${zoom * zoomSteep}&ShiftX=${shiftX * shiftStepX}&ShiftY=${shiftY * shiftStepY}`;
        getImage(params, this.updateImage);
    }

    updateImage(image) {
        this.setState(image);
    }

    assign(property, value) {
        const newProperty = {};
        newProperty[property] = value;
        this.setState(newProperty, this.sendRequestImage);
    }

    render() {
        const { zoom, shiftX, shiftY, zoomSteep, shiftStepX, shiftStepY, imageBase64} = this.state;
        return (
            <div>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={3}>
                        <Input icon='user' iconPosition='left' type='number' placeholder='Zoom step' id="zoomSteep"
                               defaultValue={zoomSteep} onChange={(e, data) => this.assign(e.target.id, Number(data.value))}
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
                        <Progress progress='value' value={zoom * zoomSteep} />
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column width={3}>
                        <Input icon='user' iconPosition='left' type='number' placeholder='Shift StepX' id="shiftStepX"
                               defaultValue={shiftStepX} onChange={(e, data) => this.assign(e.target.id, Number(data.value))}
                        />
                        <Label as='a' color='teal' tag>
                            ShiftX Step
                        </Label>
                    </Grid.Column>
                    <Grid.Column width={3}>
                        <Input icon='user' iconPosition='left' type='number' placeholder='StepX' id="shiftX"
                               defaultValue={shiftX} onChange={(e, data) => this.assign(e.target.id, Number(data.value))}
                        />
                        <Label as='a' color='teal' tag>
                            ShiftX {shiftX * shiftStepX}
                        </Label>
                    </Grid.Column>
                    <Grid.Column width={8}>
                        <Progress progress='value' value={shiftX * shiftStepX} />
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column width={3}>
                        <Input icon='user' iconPosition='left' type='number' placeholder='Shift Step Y' id="shiftStepY"
                               defaultValue={shiftStepY} onChange={(e, data) => this.assign(e.target.id, Number(data.value))}
                        />
                        <Label as='a' color='teal' tag>
                            ShiftY Step
                        </Label>
                    </Grid.Column>
                    <Grid.Column width={3}>
                        <Input icon='user' iconPosition='left' type='number' placeholder='StepY' id="shiftY"
                               defaultValue={shiftY} onChange={(e, data) => this.assign(e.target.id, Number(data.value))}
                        />
                        <Label as='a' color='teal' tag>
                            ShiftX {shiftY * shiftStepY}
                        </Label>
                    </Grid.Column>
                    <Grid.Column width={8}>
                        <Progress progress='value' value={shiftY * shiftStepY} />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    Images
                </Grid.Row>
            </Grid>

            <Grid>
                <Grid.Column>
                    <div onWheel = {(e) => this.wheel(e, zoom)}>
                        <Image src={imageBase64} size='huge' centered/>
                    </div>
                </Grid.Column>
            </Grid>
            </div>
        );
    }
}

export default ImageForm;
