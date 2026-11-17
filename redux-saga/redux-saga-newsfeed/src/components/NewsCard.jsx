function formatDate(timestamp) {
  const date = new Date(timestamp * 1000);

  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function getImageUrl(attachment) {
  let sizes = [];

  if (attachment.type === "photo") {
    sizes = attachment.photo?.sizes ?? [];
  }

  if (attachment.type === "link") {
    sizes = attachment.link?.photo?.sizes ?? [];
  }

  if (attachment.type === "video") {
    sizes = attachment.video?.image ?? [];
  }

  if (sizes.length === 0) {
    return null;
  }

  const largest = [...sizes].sort(
    (a, b) => b.width - a.width
  )[0];

  return largest.url;
}

function NewsCard({ news }) {
  const attachments = news.attachments ?? [];

  return (
    <article className="news-card">
      <header className="news-header">
        <div className="avatar">Н</div>

        <div>
          <h2>Нетология</h2>
          <time dateTime={new Date(news.date * 1000).toISOString()}>
            {formatDate(news.date)}
          </time>
        </div>
      </header>

      <p className="news-text">{news.text}</p>

      {attachments.map((attachment, index) => {
        const imageUrl = getImageUrl(attachment);

        if (attachment.type === "link") {
          const link = attachment.link;

          return (
            <a
              className="attachment-link"
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              key={index}
            >
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt={link.title || "Изображение"}
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                  }}
                />
              )}

              <strong>{link.title}</strong>
              <span>{link.description}</span>
            </a>
          );
        }

        if (imageUrl) {
          return (
            <img
              className="news-image"
              src={imageUrl}
              alt="Вложение к новости"
              key={index}
              onError={(event) => {
                event.currentTarget.style.display = "none";
              }}
            />
          );
        }

        return null;
      })}

      <footer className="news-stats">
        <span>♡ {news.likes?.count ?? 0}</span>

        <span>♧ {news.comments?.count ?? 0}</span>

        <span>↗ {news.reposts?.count ?? 0}</span>

        <span>◉ {news.views?.count ?? 0}</span>
      </footer>
    </article>
  );
}

export default NewsCard;