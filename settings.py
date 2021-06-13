###############################################################################
# Project-specific settings
###############################################################################

# Shows debug messages while Silence is running
DEBUG_ENABLED = False

# Para lanzarlo a local
#LISTEN_ADDRESS = "192.168.1.24"

# Database connection details
DB_CONN = {
    "host": "127.0.0.1",
    "port": 3306,
    "username": "iissi2",
    "password": "iissi2",
    "database": "greortsol2",
}

# The sequence of SQL scripts located in the sql/ folder that must
# be ran when the 'silence createdb' command is issued
SQL_SCRIPTS = [
    "create_tables.sql",
    "create_views.sql",
    "populate_database.sql",
    "triggers.sql"
]

# The port in which the API and the web server will be deployed
HTTP_PORT = 8080

# The URL prefix for all API endpoints
API_PREFIX = "/api/v1"

# Table and fields that are used for both login and register
# Uncomment this and set up your own table and columns:

USER_AUTH_DATA = {
    "table": "Users",
    "identifier": "username",
    "password": "password",
}

# A random string that is used for security purposes
# (this has been generated automatically upon project creation)
SECRET_KEY = "8hHm7MdoeFFYHkAxY6X-xfOP3fbp6xcuHxUaetZd79k"

