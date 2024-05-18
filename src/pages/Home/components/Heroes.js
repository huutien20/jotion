import React from 'react';
import images from '~/images';

function Heroes() {
    return (
        <div className="flex flex-col items-center justify-center max-x-5xl dark:bg-[#1f1f1f]">
            <div className="flex items-center">
                <div className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px] dark:hidden">
                    <img src={images.documents} alt="Documents" className="object-contain" />
                </div>
                <div className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px] hidden dark:block">
                    <img src={images.documents_dark} alt="Documents" className="object-contain" />
                </div>

                <div className="relative w-[400px] h-[400px] hidden md:block dark:hidden">
                    <img src={images.reading} alt="Reading" className="object-contain" />
                </div>
                <div className="relative w-[400px] h-[400px] hidden md:dark:block">
                    <img src={images.reading_dark} alt="Reading" className="object-contain" />
                </div>
            </div>
        </div>
    );
}

export default Heroes;
