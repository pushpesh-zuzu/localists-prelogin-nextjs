const NoIcon = ({
    width = 50,
    height = 50
}) => {
    return (
        <svg width={width} height={height} viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21.9974 40.3346C32.1226 40.3346 40.3307 32.1265 40.3307 22.0013C40.3307 11.8761 32.1226 3.66797 21.9974 3.66797C11.8722 3.66797 3.66406 11.8761 3.66406 22.0013C3.66406 32.1265 11.8722 40.3346 21.9974 40.3346Z" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M16.5 27.5L27.5 16.5" stroke="white" strokeWidth="3.66667" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M27.5 27.5L16.5 16.5" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
};

export default NoIcon;
