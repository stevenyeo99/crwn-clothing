import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';

import './footer.styles.css';

var style = {
    backgroundColor: "#F8F8F8",
    borderTop: "1px solid #E7E7E7",
    textAlign: "center",
    padding: "20px",
    marginTop: "auto",
    left: "0",
    bottom: "0",
    width: "100%"
}

var phantom = {
  display: 'block',
  padding: '20px',
  height: '100px',
  width: '100%',
}

const Footer = () => {
    return (
        <div style={phantom}>
            <div style={style} className='footerContainer'>
                <div className={'flexContainer'}>
                    <div className='flexChild'>
                        <h3>Steby Cart</h3>

                        <p>Kelompok-3 Develop shopping shop is from by steby group. the shop have shoes,shirt,and etc</p>
                    </div>

                    <div className='flexChild'>
                        <h3>Made By</h3>
                        <h5 style={{marginBottom: 0, marginTop: '5px'}}>HTML5</h5>
                        <h5 style={{marginBottom: 0, marginTop: '5px'}}>CSS3</h5>
                        <h5 style={{marginBottom: 0, marginTop: '5px'}}>JavaScript</h5>
                        <h5 style={{marginBottom: 0, marginTop: '5px'}}>React JS</h5>
                        <h5 style={{marginBottom: 0, marginTop: '5px'}}>Firebase</h5>
                    </div>

                    <div className='flexChild'>
                        <h3>Contact</h3>
                        <h5 style={{marginBottom: 0, marginTop: '5px'}}><FontAwesomeIcon icon={faPhone} /> +62 822-8741-3565</h5>
                        <h5 style={{marginBottom: 0, marginTop: '5px'}}><FontAwesomeIcon icon={faEnvelope} /> steby.yeo@gmail.com</h5>
                    </div>
                </div>
                <hr />
                { '@ 2023 Copyright: Kelompok-3' }
            </div>
        </div>
    );
};

export default Footer;