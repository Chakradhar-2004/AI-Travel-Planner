import praw

reddit = praw.Reddit(
    client_id="D3mbViEJgAGQ8kYWy9HJhQ",
    client_secret="1AOGVYJg8m7-uMbSlFJRx8PchombXg",
    username="I_Am_Berlin",
    password="Chakri@072004",
    user_agent="my_user_agent",
)

try:
    print("Logged in as:", reddit.user.me())
except Exception as e:
    print("Error:", e)

url = "https://www.reddit.com/r/perfectlycutscreams/comments/1ejh4j3/ishowspeed_jumps_over_2_cars_on_livestream/"
post = reddit.submission(url=url)

print("Title:", post.title)
print("Author:", post.author)
print("Score:", post.score)
print("Post URL:", post.url)
print("Text Content:", post.selftext)
print("Number of Comments:", post.num_comments)

post.comments.replace_more(limit=0)
print("\nTop-level comments:")
for comment in post.comments.list()[:5]:
    print(comment.body)
