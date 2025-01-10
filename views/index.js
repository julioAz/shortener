<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="/styles.css">
  <title>URL Shortener</title>
</head>
<body>
  <div class="container">
    <h1>URL Shortener</h1>
  
    <form action="/shorten" method="post">
      <label for="fullUrl">Enter URL:</label>
      <input type="text" name="fullUrl" id="fullUrl" required>
      <button type="submit">Shorten</button>
    </form>

    <table>
      <thead>
        <tr>
          <th>Full URL</th>
          <th>Short URL</th>
        </tr>
      </thead>
      <tbody>
     
         <% urls.forEach(url => { %>
          <tr>
            <td><a href="<%= url.fullUrl %>" target="_blank"><%= url.fullUrl %></a></td>

            <td><a href="<%= url.shortUrl %>" target="_blank"><%= url.shortUrl %></a></td>
            <td><%= shortUrl.clicks %></td>
          </tr>
        <% }); %>

      </tbody>
    </table>
  </div>
</body>
</html>