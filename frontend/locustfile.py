# from locust import HttpLocust,TaskSet,task,between

# class MyTaskSet(TaskSet):

#    @task

#    def index(self):

#        self.client.get("/")

# class MyLocus(HttpLocust):

#    task_set = MyTaskSet

#    wait_time = between(3,5)

# from locust import HttpUser, task

# class HelloWorldUser(HttpUser):
#     @task
#     def hello_world(self):
#         self.client.get("login")
#         self.client.get("movies/695721")

import time
from locust import HttpUser, task, between

class QuickstartUser(HttpUser):
    wait_time = between(1, 5)

    @task
    def hello_world(self):
        self.client.get("/")