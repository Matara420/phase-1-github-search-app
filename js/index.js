document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("github-form");
    const searchInput = document.getElementById("search");
    const userList = document.getElementById("user-list");
    const repoList = document.getElementById("repos-list");
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const username = searchInput.value;
      if (username) {
        searchUsers(username);
      }
    });
  
    function searchUsers(query) {
      fetch(`https://api.github.com/search/users?q=${query}`, {
        headers: {
          Accept: "application/vnd.github.v3+json"
        }
      })
        .then((res) => res.json())
        .then((data) => {
          userList.innerHTML = "";
          repoList.innerHTML = "";
          data.items.forEach(user => {
            const li = document.createElement("li");
            li.innerHTML = `
              <img src="${user.avatar_url}" width="50">
              <a href="${user.html_url}" target="_blank">${user.login}</a>
            `;
            li.addEventListener("click", () => fetchRepos(user.login));
            userList.appendChild(li);
          });
        });
    }
  
    function fetchRepos(username) {
      fetch(`https://api.github.com/users/${username}/repos`, {
        headers: {
          Accept: "application/vnd.github.v3+json"
        }
      })
        .then((res) => res.json())
        .then((repos) => {
          repoList.innerHTML = "";
          repos.forEach(repo => {
            const li = document.createElement("li");
            li.innerHTML = `<a href="${repo.html_url}" target="_blank">${repo.name}</a>`;
            repoList.appendChild(li);
          });
        });
    }
  });
  