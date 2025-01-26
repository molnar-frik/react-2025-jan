export default function Log({logs}) {

    return (
        <div id="log">
            <h2>Log</h2>
            <ol>
                {logs.map((log, index) => (
                    <li key={index}>{log}</li>
                ))}
            </ol>
        </div>
    );
}