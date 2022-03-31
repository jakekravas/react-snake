export default ({ snakeDots }) => {
  return (
    <div>
      {snakeDots.map((dot, i) => {
        const style = {
          left: `${dot[0]}%`,
          top: `${dot[1]}%`
        }
        return <div key={i} style={style} className='snake-dot'/>
      })}
    </div>
  )
}
