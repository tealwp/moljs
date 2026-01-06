export function GithubLink() {
  return (
    <footer
      style={{
        marginTop: "2rem",
        textAlign: "center",
        color: "#888",
        fontSize: "0.9rem",
      }}
    >
      <a
        href="https://github.com/tealwp/moljs"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          color: "inherit",
          textDecoration: "underline",
          textUnderlineOffset: "4px",
        }}
      >
        View source on GitHub @tealwp
      </a>
    </footer>
  );
}
