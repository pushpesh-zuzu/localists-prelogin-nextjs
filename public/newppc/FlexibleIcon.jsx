const FlexibleIcon = ({
    width = 50,
    height = 50
}) => {
    return (
        <svg width={width} height={height} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M38.2468 21.8543C37.6449 27.5091 34.4409 32.8081 29.1391 35.8691C20.3305 40.9548 9.06708 37.9367 3.98145 29.1282L3.43979 28.19M1.61484 17.9853C2.21674 12.3305 5.42079 7.03144 10.7226 3.97044C19.5311 -1.11518 30.7946 1.90285 35.8802 10.7114L36.4219 11.6496M1.5 33.0627L3.08611 27.1432L9.00555 28.7294M30.8563 11.1101L36.7757 12.6962L38.3618 6.77679M19.9309 10.1697V19.9197L25.3476 23.1697" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
};

export default FlexibleIcon;
