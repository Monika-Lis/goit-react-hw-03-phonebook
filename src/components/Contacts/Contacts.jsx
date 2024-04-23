import css from './Contacts.module.css';
import PropTypes from 'prop-types';

export const Contacts = ({ contacts, filter, onDelete }) => {
  const filteredContacts = contacts.filter(contact =>
    contact.name?.toLowerCase().includes(filter.toLowerCase())
  );

  

  return (
    <div>
      <table className={css.table}>
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {filteredContacts.map(contact => (
            <tr className={css.trBody} key={contact.id}>
              <td>{contact.name}: </td>
              <td>{contact.number}</td>
              <td className={css.tdButton}>
                <button
                  className={css.button}
                  onClick={() => onDelete(contact.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

Contacts.propTypes = {
  contacts: PropTypes.array.isRequired,
  filter: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};
