const Avatar = ({
    src,
    name = '',
    fallback = 'U',
    alt,
    className = '',
    imageClassName = 'w-full h-full object-cover',
    children
}) => {
    const initial = (name?.charAt(0) || fallback).toUpperCase();

    return (
        <div className={className}>
            {src ? (
                <img src={src} alt={alt || name || 'Avatar'} className={imageClassName} />
            ) : (
                children || initial
            )}
        </div>
    );
};

export default Avatar;