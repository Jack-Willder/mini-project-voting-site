document.addEventListener('DOMContentLoaded', () => {
  if (document.cookie.indexOf("submitted=true") !== -1) changeState();

  document.getElementById('topicForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const roll = document.getElementById('roll').value.trim();
    const topic = document.getElementById('topic').value.trim();
    console.log(roll);
    console.log(topic);
    console.log(JSON.stringify({roll, topic}));
    const wordCount = topic.split(/\s+/).filter(w => w).length;
    if (wordCount > 50) {
      alert("Topic must be under 50 words.");
      return;
    }
    fetch('/submit', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({roll, topic})
    })
    .then(res => res.json())
    .then(data => {
      document.cookie = "submitted=true; expires=Fri, 31 Dec 9999 23:59:59 GMT; SameSite=Lax";
      document.getElementById('topicForm').style.display = 'none';
      changeState();
      displaySubmissions(data.submissions);
    })
    .catch(err => console.error("Submit error:", err));
  });

  fetch('/submissions')
    .then(res => res.json())
    .then(data => {
      if (data.submissions) displaySubmissions(data.submissions);
    });

  function displaySubmissions(list) {
    let index=0;
    // const ul = document.getElementById('submissionsList');
    const table = document.getElementsByTagName('table')[0]
    console.log(table)
    // ul.innerHTML = '';
    table.innerHTML = '<tr><th style="width: 20%;">ROLLNUMBER</th><th>TITLE</th></tr>'
    list.forEach(sub => {
      const tr = document.createElement('tr');
      const td1 = document.createElement('td');
      const td2 = document.createElement('td');
      if (index==0) {
        td1.classList.add('odd');
        td2.classList.add('odd');
        index=1;
      } else {
        td1.classList.add('even');
        td2.classList.add('even');
        index=0;
      }
      td1.textContent = sub.roll;
      td2.textContent = sub.topic;
      tr.appendChild(td1)
      tr.appendChild(td2)
      table.appendChild(tr);
    });
  }

  function changeState() {
    document.getElementById('topicForm').style.display = 'none';
    let state = document.getElementById('state');
    state.innerText = "You Have already Submitted.";
    state.classList.add('redHeading');
    // document.getElementById('submissionsList').innerHTML = '<li>You have already submitted.</li>';
  }
});