import React from "react"
import "./Footer.css"
import githubLogo from "/github.svg"

export default function Footer() {
    return (
    <footer>
        <div>Author: Gabriel Pascual</div>
        <div className="right-footer">
          <a href="https://github.com/gabrielpnjit/tenzies">
            <img
              className="footer-logo"
              src={githubLogo}
            />
          </a>
          <a href="https://github.com/gabrielpnjit/tenzies"> Source Code </a>
        </div>
    </footer>
    )
}