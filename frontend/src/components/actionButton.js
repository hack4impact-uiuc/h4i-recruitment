import Link from 'next/link'

const ActionButton = ({ className, link, text, white, onClick }) => (
  <button
    className={white ? 'white-button ' + className : 'action-button ' + className}
    onClick={onClick === undefined && link !== undefined ? null : onClick}
  >
    {link !== undefined ? (
      <Link prefetch href={link}>
        <a>{text}</a>
      </Link>
    ) : (
      <a>{text}</a>
    )}
    <style jsx>{`
      button {
        border-image: initial;
        overflow: hidden;
        transition: all 0.15s ease 0s;
        height: 2.5rem;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
        border-radius: 5px;
        padding: 0px 2rem;
        border: none;
        color: white;
      }
      button a {
        font-weight: 500;
        font-size: 14px;
        text-decoration: none;
      }
      .white-button {
        background: white;
      }
      .white-button a {
        color: black !important;
      }
      .action-button {
        background: #155da1;
      }

      .action-button a {
        color: white !important;
      }

      button:hover {
        box-shadow: rgba(0, 0, 0, 0.12) 3px 5px 20px;
        transition: border 0.2s, background 0.2s, color 0.2s ease-out;
      }
    `}</style>
  </button>
)

export default ActionButton
