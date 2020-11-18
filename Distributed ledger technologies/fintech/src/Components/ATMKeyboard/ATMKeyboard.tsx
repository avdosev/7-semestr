import React from "react";
import {Button, Grid, GridColumn, GridRow} from "semantic-ui-react";


export class ATMKeyboard extends React.Component<any> {
    render() {

        return <Grid>

            <GridRow>
                <Button>1</Button>
                <Button>2</Button>
                <Button>3</Button>
                <Button content="Отмена" negative={true}/>
            </GridRow>
            <GridRow>
                <Button>4</Button>
                <Button>5</Button>
                <Button>6</Button>
                <Button content="Сброс" color={'yellow'}/>

            </GridRow>
            <GridRow>
                <Button>7</Button>
                <Button>8</Button>
                <Button>9</Button>
                <Button/>

            </GridRow>
            <GridRow>
                <Button>0</Button>
                <Button content="Ввод" positive={true}/>
            </GridRow>
            
        </Grid>;
    }
}