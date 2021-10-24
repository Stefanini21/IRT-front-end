import React, {Component} from "react";
import "./home.component.css";
import homephoto from "./homepage.png";
import Image from 'react-image-resizer';

export default class Home extends Component {
    constructor(props) {
        super(props);
        //
        // this.state = {
        //   content: <img src={required('./homepage.png')} alt="Homephoto">
        // };
    }

    componentDidMount() {

    }


    render() {
        return (
            <div className="centerimage">
                <Image
                img src={homephoto} alt="homephoto" class="centerimage"
                width={600}
                height={450}
                    />
            </div>
        );
    }
}
