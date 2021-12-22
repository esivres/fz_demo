import { useNavigate } from "react-router-dom";

function roleConverter(role){
  switch (role){
    case 'CLIENT_MANAGER':
      return 'Менеджер по работе с клиентами'
    case 'SERVICE_MANAGER':
      return 'Менеджер по обслуживанию'
    case 'TOP_MANAGER':
      return 'Руководитель'
    case 'ADMINISTRATOR':
      return 'Администратор'
  }
}

function EmployeeSearchCard(props){
  const navigate = useNavigate();

  return (
    <div onClick={()=>navigate(`/employee/${props.id}`)}>
      <div className="uk-card uk-card-hover uk-card-body">
        <h3 className="uk-card-title">{props.fio}</h3>
        <p>{roleConverter(props.position)}</p>
        <time>{props.dob}</time>
      </div>
    </div>
  )
}

export default EmployeeSearchCard;