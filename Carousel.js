import {Carousel} from 'react-responsive-carousel';
import banniere1 from './img/bannière(1).jpg';
import banniere2 from './img/bannière(2).jpg';
import banniere3 from './img/bannière(3).jpg';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader


export default function Banniere(){
    return (
        <Carousel className='banniere' 
         showArrows={true}
         showIndicators = {false} 
         showThumbs = {false}
         transitionTime={500}
         infiniteLoop
         autoPlay = {true}
         interval={5000}
         >
            <div>
                <img src= {banniere1} />
            </div>
            <div>
                <img src={banniere2} />
            </div>
            <div>
                <img src={banniere3} />
            </div>
        </Carousel>
    )
}