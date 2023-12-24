import { IoChevronDownOutline} from "react-icons/io5"


interface PropsTitle {
  title: string,
  id: string,
  chengeActiveElement: (id: string) => void,
  create: boolean
}

export const HeaderAccordion = ({title, id, chengeActiveElement, create}: PropsTitle) => {
  return (
    <div>
      <p>{title}</p>
      <button disabled={create}>
        <IoChevronDownOutline onClick={() => chengeActiveElement(id)}/>
      </button>
    </div>
  )
}