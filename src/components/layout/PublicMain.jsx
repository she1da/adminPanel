import React from 'react';
import Footer from '../Footer';
import PublicHeader from '../PublicHeader';

const PublicLayout = ({children}) => {
    return (
        <div>
            <PublicHeader/> 
            {children}  
            <Footer/>
        </div>
    );
}

export default PublicLayout;
