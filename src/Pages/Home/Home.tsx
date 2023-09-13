import React from 'react';
import'./Home.css'
import Camera from '../../assets/imgs/pexels-cottonbro-studio-2773526.jpg'
import { Button } from 'react-bootstrap';

const HomePage: React.FC = () => {
  return (
    <div className='home-wrapper'>
      <div className='Camera-wrapper'>
        <div className='filter'>
          <img className="CameraImg" src={Camera}></img>
        </div>
        <div className='CTA-holder'>
          <h1>NEXT EVOLUTION OF CINEMATOGRAPHY CAMERAS IN STOCK (SECOND-HAND)</h1>
          <div className='home-btn-holder'>
            <Button className="btn btn-danger" href='/products'>Buy now</Button>
            <Button className="btn btn-danger" href='/products'>Learn more</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
