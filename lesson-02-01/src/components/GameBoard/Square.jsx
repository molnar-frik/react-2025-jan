/**
 *
 * @param {string|null} value
 * @param {function} onClick
 * @returns {JSX.Element}
 * @constructor
 */
export default function Square({value, onClick}) {

    return (
        <button onClick={onClick}>{value}</button>
    );
}