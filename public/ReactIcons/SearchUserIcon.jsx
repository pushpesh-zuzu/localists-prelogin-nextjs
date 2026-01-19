const SearchUserIcon = ({
    // className = "",
    // bgColor = "white",
    // strokeColor = "#00AFE3",
    width = "76",
    height = "76"
}) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 132 132"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            // className={className}
        >
            <rect width="75.4286" height="75.4286" rx="37.7143" />
            <path
                d="M69.6693 69C69.6693 67.1392 69.6693 66.2089 69.4396 65.4518C68.9225 63.7473 67.5887 62.4134 65.8841 61.8963C65.1271 61.6667 64.1967 61.6667 62.3359 61.6667H55.6693C53.8085 61.6667 52.8781 61.6667 52.1211 61.8963C50.4165 62.4134 49.0827 63.7473 48.5656 65.4518C48.3359 66.2089 48.3359 67.1392 48.3359 69M65.0026 51C65.0026 54.3137 62.3163 57 59.0026 57C55.6889 57 53.0026 54.3137 53.0026 51C53.0026 47.6863 55.6889 45 59.0026 45C62.3163 45 65.0026 47.6863 65.0026 51Z"
                stroke="white"
                strokeWidth="4.3956"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            <path
                d="M100.125 100.125L77.3754 77.375M84.9583 58.4167C84.9583 73.0752 73.0752 84.9583 58.4167 84.9583C43.7581 84.9583 31.875 73.0752 31.875 58.4167C31.875 43.7581 43.7581 31.875 58.4167 31.875C73.0752 31.875 84.9583 43.7581 84.9583 58.4167Z"
                stroke="white"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default SearchUserIcon;
