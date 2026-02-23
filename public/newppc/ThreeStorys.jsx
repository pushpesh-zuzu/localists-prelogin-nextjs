const ThreeStorys = ({
    width = 50,
    height = 50
}) => {
    return (
        <svg width={width} height={height} viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.609375 25.3689L32.1834 1.25781L43.6649 10.0124V4.12818H52.276V16.6143L63.7575 25.3689" stroke="white" strokeWidth="2" />
            <path d="M1.83594 50.4627L33.41 26.3516L53.5026 41.708L64.9841 50.4627" stroke="white" strokeWidth="2" />
            <path d="M1.83594 37.9158L33.41 13.8047L53.5026 29.1612L64.9841 37.9158" stroke="white" strokeWidth="2" />
            <rect x="24.8516" y="43.5742" width="6.57812" height="6.57812" stroke="white" strokeWidth="1.5" />
            <rect x="24.8516" y="53.7109" width="6.57812" height="6.57812" stroke="white" strokeWidth="1.5" />
            <rect x="35.1172" y="43.5742" width="6.57812" height="6.57812" stroke="white" strokeWidth="1.5" />
            <rect x="35.1172" y="53.7109" width="6.57812" height="6.57812" stroke="white" strokeWidth="1.5" />
        </svg>
    );
};

export default ThreeStorys;
