import React, {Component} from "react";
import "./css/home.component.css";
import homephoto from "./homepage.png";
import Image from 'react-image-resizer';


const element = <h1>“If a task is once begun,
    never leave it ‘till it’s done.
    Be the labor great or small,
    do it well or not at all.”</h1>;

export default class Home extends Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
    }


    render() {
        return (
            <div>
                <h1 style={{
                    'font-family': 'Goergia',
                    'font-weight': ' bold',
                    'color': '#3f4a70',
                    'font-style': ' oblique',
                    'font-size': ' 40px'
                }}>“If a task is once begun,
                    never leave it ‘till it’s done.
                    Be the labor great or small,
                    do it well or not at all.”</h1>,
                <div className="centerimage">
                    <Image
                        img src={homephoto} alt="homephoto" class="centerimage"
                        width={600}
                        height={650}
                    />
                </div>
            </div>
        );
    }
}
