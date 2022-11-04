import styles from "./404.module.css";

export default function FourOhFour() {
  return (
    <div className={styles.container}>
      <form method="POST">
        <div>
          <label htmlFor="name">First name</label>
          <input type="text" name="firstName" />
        </div>
        <div>
          <label htmlFor="name">Last name</label>
          <input type="text" name="lastName" />
        </div>
        <div>
          <label htmlFor="email">Work email</label>
          <input type="email" placeholder="user@company.com" name="email" />
        </div>
        <div>
          <p>Which code host(s) does your team work with?</p>
          <div>
            <label>
              <input
                id="GitHub"
                name="codeHosts"
                type="checkbox"
                value="GitHub"
              />
              <span>GitHub</span>
            </label>
            <label>
              <input
                id="GitLab"
                name="codeHosts"
                type="checkbox"
                value="GitLab"
              />
              <span>GitLab</span>
            </label>
            <label>
              <input
                id="Bitbucket"
                name="codeHosts"
                type="checkbox"
                value="Bitbucket"
              />
              <span>Bitbucket</span>
            </label>
            <label>
              <input
                id="Perforce"
                name="codeHosts"
                type="checkbox"
                value="Perforce"
              />
              <span>Perforce</span>
            </label>
            <label>
              <input id="CVS" name="codeHosts" type="checkbox" value="CVS" />
              <span>CVS</span>
            </label>
            <label>
              <input
                id="Gerrit"
                name="codeHosts"
                type="checkbox"
                value="Gerrit"
              />
              <span>Gerrit</span>
            </label>
            <label>
              <input
                id="Other"
                name="codeHosts"
                type="checkbox"
                value="Other"
              />
              <span>Other</span>
            </label>
          </div>
        </div>
        <button type="submit">Continue</button>
      </form>
    </div>
  );
}
