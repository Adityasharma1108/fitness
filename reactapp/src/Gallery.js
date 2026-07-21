import React from 'react';

const Gallery = () => {
  const facilityImages = [
    { 
      url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80', 
      title: 'Cardio Zone' 
    },
    { 
      url: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80', 
      title: 'Strength Training' 
    },
    { 
      url: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=800&q=80', 
      title: 'Sauna & Recovery' 
    },
 
  ];

  return (
    <section className="gallery-container">
      <h2 className="section__title center" data-aos="fade-up">
        ELITE <span className="highlight">FACILITIES</span>
      </h2>
      <div className="gallery__grid">
        {facilityImages.map((img, index) => (
          <div key={index} className="gallery__card" data-aos="zoom-in">
            <div className="gallery__image-wrapper">
              <img src={img.url} alt={img.title} className="facility-img" />
              <div className="gallery__overlay">
                <p className="highlight">{img.title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Gallery;