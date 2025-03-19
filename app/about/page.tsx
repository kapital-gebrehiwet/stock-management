import React from 'react';
import Image from 'next/image';

function About() {
    return (
        <>
            <div className="about-container">
                <h1 className="hotel-title">SEYLOM HOTEL</h1>
                <p className="hotel-description">
                    Welcome to Selom Hotel, owned by Mulubrhan Gebrehiwet, a civil engineer in South Sudan, Juba. Our hotel provides a comfortable and luxurious experience, perfect for both business and leisure travelers.
                </p>
            </div>
            <Image 
                src="/image.png"
                alt="Hotel" 
                width={800}
                height={600}
                className="hotel-image" 
            />
            
            {/* Video Section */}
            <div className="video-container">
                <h2 className="video-title">Watch Our Introduction Video</h2>
                <video 
                    controls 
                    className="video"
                >
                    <source src="/seylom.mp4" type="video/mp4" /> 
                    Your browser does not support the video tag.
                </video>
            </div>
        </>
    );
}

export default About;