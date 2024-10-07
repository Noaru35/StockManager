import React from 'react';
import './styles/HomePage.css'; // Arquivo CSS separado

function HomePage() {
  return (
    <div className="home-page">
      <section>
        <div className="text">
          <h2><span className="highlight-black">Lorem</span> <span className="highlight-purple">Ipsum</span></h2>
          <p>
            frtghgfhgfgjfgjfygjfgjfgjfgjsdclfjksjdlkc slgdfklksdjf, posdlfklsdf,klcfj spsodfkpfsd slgdfklds,flg sqldfklsd,fs,kj oieorfsmisdopofkposdkf
          </p>
        </div>
        <img src="image_placeholder.jpg" alt="Example" className="image-example" />
      </section>
    </div>
  );
}

export default HomePage;
