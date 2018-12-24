import Link from 'next/link'

const ActionLink = ({ link, text, style, onClick }) => (
  <>
    {link !== undefined ? (
      <Link href={link}>
        <a className="link" style={{ color: '#155da1', ...style }}>
          {text}
        </a>
      </Link>
    ) : (
      <a className="link" style={{ color: '#155da1', ...style }} onClick={onClick}>
        {text}
      </a>
    )}
    <style jsx>{`
      .link {
        font-weight: 400;
        line-height: 1.2;
        letter-spacing: normal;
        font-size: 15px;
        margin: auto;
        border-bottom: 1px solid #3f46ad;
        margin-top: 40px;
      }
    `}</style>
  </>
)

export default ActionLink
