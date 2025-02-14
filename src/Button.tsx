
type ButtonPropsType = {
    title: string;
    onClick?: () => void;
}
export const Button = ({title,onClick}: ButtonPropsType) => {
    console.log(onClick, "На меня нажали" + title)
    return <button onClick={onClick}>{title}</button>
};

