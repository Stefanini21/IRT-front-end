import React, {Component} from "react";
import "./css/home.component.css";
// import homephoto from "./homepage";
import Image from 'react-image-resizer';

export default class Home extends Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
    }


    render() {
        return (
            <div className="centerimage">
                <Image
                    // img src={homephoto} alt="homephoto" class="centerimage"
                    // width={600}
                    // height={650}
                />
            </div>
        );
    }
}
