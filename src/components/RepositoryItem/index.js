import './index.css'
import {BsStarFill, BsInfoCircle} from 'react-icons/bs'
import {LuGitFork} from 'react-icons/lu'

const RepositoryItem = props => {
  const {each1} = props
  const {name, id, issuesCount, forksCount, starsCount, avatarUrl} = each1
  return (
    <li className="bg-item">
      <img src={avatarUrl} alt={name} className="avatar" />
      <p className="name">{name}</p>
      <div className="icon-items">
        <BsStarFill className="star-gold" />
        <p className="paragraph">{starsCount}</p>
        <p>stars</p>
      </div>
      <div className="icon-items">
        <LuGitFork className="forks" />
        <p className="paragraph">{forksCount}</p>
        <p>forks</p>
      </div>
      <div className="icon-items">
        <BsInfoCircle className="issues" />
        <p className="paragraph">{issuesCount}</p>
        <p>open issues</p>
      </div>
    </li>
  )
}
export default RepositoryItem
