'use client'

export default function Image(img: ImageProps) {
    return (
        <img className={img.className}
            src={img.src}
            alt={img.alt} 
            onError={(e) => {
                e.currentTarget.onerror=null;
                e.currentTarget.src='/image-gallery.svg';
            }}/>
    );
}