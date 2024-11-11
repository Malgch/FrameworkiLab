const filled = '★';
const outlined = '✩';

function RatingBar({rate}){

    const start = new Array(10);
    start.fill(outlined);
    start.fill(filled,0, rate);

    return(
        <>
        {start.map((e,i)=><span key={i}>{e}</span>)}
        </>
    )
}
export default RatingBar