import css from './ContactList.module.css'
import Contact from '../Contact/Contact'
import { selectFilteredContacts } from '../../redux/contactsSlice'
import { useSelector } from 'react-redux'

const ContactList = () => {
	const contacts = useSelector(selectFilteredContacts)
	return (
		<ul className={css.list}>
			{contacts.map(contact => {
				return (
					<li key={contact.id}>
						<Contact contact={contact} />
					</li>
				)
			})}
		</ul>
	)
}
export default ContactList
