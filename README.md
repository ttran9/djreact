# DjangoReact App

# This repository will be my following of [this video series](https://www.youtube.com/playlist?list=PLLRM7ROnmA9FxCtnLoIHAs6hIkJyd1dEx)

# Notes
    - The initial master upload will be my solution after video 1 and with the additional form to be able to create an 
    article.
        - My initial solution does not require the user to be logged in to create an article. This will be fixed in a 
        later upload.
        - My initial solution for the update is not ideal because I had to create another component which is very similar
        the ArticleCreateView except it sends a put request instead of a post request.
        - My initial deletion solution does not require for the user to be logged in and to be the owener of the article.
        I will work towards resolving this issue with a later upload.
        
        
# Video 3 Notes
    - The store directory is something react redux uses to maintain the state for the entire application.
        - Store is broken into two parts
            - actions
                - Something we want to define that takes place.
                    - login, logout, etc.
            - reducers            
                - Takes the state and returns only a piece that is required.
                
                
# Video 4 Notes (Deploying to Heroku)
    - articles directory: holds our Articles API
    - djreact_backend: houses our settings
    - public: what is actually served on Heroku.
    - src: our react application
    - other files... such as the database and the manage.py script to run the Django server.
    - in package.json
        - we are just specifying what version of node and npm we're using.
        - the script, "postinstall", calls the build process as soon as the application has been installed.
    - procFile: a configuration file used by Heroku
        - "release: python manage.py migrate"
            - release just says that every time we release the application (upload everything) then the "python manage.py migrate" gets executed. 
        - add in the web process..
            - the left side is the process type.
            - the right side is the actual command
            - web: gunicorn djreact_backend.wsgi --log-file -
            - the web process is a special process that allows http web traffic to enter it and this ensures we can even
            run a web server.  
    - inside of requirements.txt
        - gunicorn is our webserver
        - whitenoise helps us serve static files.
    - runtime.txt
        - a file for the python runtime version
    - I was having an issue with Heroku not detecting this as a Node app and I had to delete and reinstall my git repository.
        - this [thread here](https://stackoverflow.com/questions/38658038/why-does-heroku-fail-to-detect-node-js-buildpack) was very helpful.
    - for djreact_backend/urls.py
        - "re_path": helps the back-end recognize incoming requests although our front-end doesn't have this issue.
            - this ultimately helps display the proper view.
            - we are able to do TemplateView.as_view(template_name='index.html') because in the settings.py we specified
            'DIRS': [os.path.join(BASE_DIR, 'build')] (we joined the BASE_DIR with the Build directory).