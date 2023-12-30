import { IoChevronDownOutline} from "react-icons/io5"

interface PropsTitle {
  title: string,
  id: string,
  changeActiveElement: (id: string) => void,
  create: boolean
}

export const HeaderAccordion = ({title, id, changeActiveElement, create}: PropsTitle) => {
  return (
    <div className="header_accordion">
      <p>{title}</p>
      <button disabled={create} className="item_header">
        <IoChevronDownOutline onClick={() => changeActiveElement(id)}/>
      </button>
    </div>
  )
}