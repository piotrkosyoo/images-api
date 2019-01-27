import React, {Component} from 'react';
import {Progress} from 'semantic-ui-react'
import {Button} from 'semantic-ui-react'
import {Grid, Image} from 'semantic-ui-react'
import {Label} from 'semantic-ui-react'
import { Input } from 'semantic-ui-react'

import autobind from 'autobind-decorator'

class ImageForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            zoom: 1,
            zoomSteep: 1,
            shiftX: 0,
            shiftY: 0,
            shiftStepX: 1,
            shiftStepY: 1
        }
    }

    @autobind
    assign(field, value) {
        this.setState({field: value});
    }

    render() {

        const { zoom, shiftX, shiftY, zoomSteep, shiftStepX, shiftStepY} = this.state;

        return (
            <Grid>
                <Grid.Row>
                    <Grid.Column width={4}>
                        <Input loading icon='user' iconPosition='left' type='number' placeholder='Zoom step' defaultValue={zoomSteep} onChange={(e, data) => this.assign(e, data)} />
                        <Label as='a' color='teal' tag>
                            Zoom
                        </Label>
                        <Button content='+1' onChange={(e, data) => this.assign(e, data)} primary/>
                        <Button content='-1' onChange={(e, data) => this.assign(e, data)} secondary/>
                    </Grid.Column>
                    <Grid.Column width={8}>
                        <Progress progress='value' value={zoom} />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={4}>
                        <Label as='a' color='teal' tag>
                            ShiftX
                        </Label>
                        <Button content='Primary' primary/>
                        <Button content='Secondary' secondary/>
                    </Grid.Column>
                    <Grid.Column width={8}>
                        <Progress percent={44} progress/>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={4}>
                        <Label as='a' color='teal' tag>
                            ShiftY
                        </Label>
                        <Button content='Primary' primary/>
                        <Button content='Secondary' secondary/>
                    </Grid.Column>
                    <Grid.Column width={8}>
                        <Progress percent={44} progress/>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    Images
                </Grid.Row>
            </Grid>

        );
    }
}

export default ImageForm;
