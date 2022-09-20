const Header = ({course}) => <h1>{course.name}</h1>

const Total = ({sum}) => <b>total of {sum} exercises</b>

const Part = ({part}) =>
    <p>
        {part.name} {part.exercises}
    </p>

const Content = ({parts}) => {
    return (
        <>
            {parts.map(p => <Part part={p} key={p.id}></Part>)}
            <Total sum={(parts.reduce((prev, curr) => prev + curr.exercises, 0))}></Total>
        </>
    )
}

const Course = ({course}) =>
    <>
        <Header course={course}></Header>
        <Content parts={course.parts}></Content>
    </>

export default Course