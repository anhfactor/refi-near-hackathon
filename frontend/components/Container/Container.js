export default function Container({ children }) {
    return (
        <div className="absolute top-1/5 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div style={{width:"36rem"}}>{children}</div>
        </div>
    );
}
