"""Hello world application."""

import os
import urllib

from google.appengine.api import users
from google.appengine.ext import ndb
from webapp2_extras import routes

import jinja2
import webapp2
import json
import logging

# Custom imports
#from database_site import *
from admin_models import *
from article_handler import *
from admin_category import *
from resource_handler import *

################################################################################
class MainPage(webapp2.RequestHandler):

  def get(self):
    """ """
    #self.response.headers['Content-Type'] = 'text/plain'
    #self.response.write('Everyday computing')

    template_values = {
      'hide': 1,
      'url': self.request.application_url,
      'user': users.get_current_user(),
      'url': users.create_logout_url(self.request.uri),
      'url_linktext': "Logout"
    }

    template = JINJA_ENVIRONMENT.get_template('templates/home.html')
    self.response.write(template.render(template_values))

  def post(self):
    self.response.write("-------------------------------------------------")
    #self.response.write(structured_dictionary)

    # structured_dictionary is the body of the post (which is the json file)
    structured_dictionary = json.loads(self.request.body)

    # Loop through the dictionary and print out some basic info (for debugging)
    self.response.write(structured_dictionary)


""" Handle a print out of the goals in CSV, JSON, etc. """
class GoalHandler(webapp2.RequestHandler):

  def get(self):
    """ """
    outputFormat = self.request.get('format')
    self.response.headers['Content-Type'] = 'text/plain'
    query = LearningGoal.query()#.order(-Article.timestamp.created)
    goals = query.fetch()

    if outputFormat == 'json':
      s = json.dumps([p.to_dict() for p in goals])
      self.response.write(s)
    else:
      for goal in goals:
        outputString = ''
        outputString = "> %s | %s | %s | %s | %s | %s | %s\n" % \
        (goal.key.urlsafe(), goal._domainFromLiteratureReview, \
        goal._domain, goal._support, goal.age_level, goal.goal, goal.cluster)
        self.response.write(outputString)

    #self.response.write('Everyday computing')
    #self.response.headers['Content-Type'] = 'application/csv'



#for item in structured_dictionary:
#    self.response.write("%s %s - %s\n" % (item['lessonNumber'],item['title'],item['parentCourse']))

#
#
#
APP = webapp2.WSGIApplication([
                               #webapp2.Route('/', handler=MainPage, name='home'),
                               #webapp2.Route('/resource/', handler=ResourceHandler, name='resource-handler'),
                               routes.PathPrefixRoute('/resource', [
                                                                   webapp2.Route('/', ResourceHandler, 'user-overview')
                              #                                      webapp2.Route('/article/insert/', ArticleInsertHandler, 'user-projects'),
                              #                                      webapp2.Route('/article/<key>/', ArticleCategoryHandler, 'user-profile'),
                              #                                      webapp2.Route('/article/', ArticleHandler, 'user-overview'),
                              #                                      webapp2.Route('/article/goal/<task:(insert|edit|delete)>/<article_key>/', ArticleGoalHandler, 'user-projects'),
                              #                                      webapp2.Route('/article/goal/<article_key>/<learning_goal_key>/', ArticleGoalHandler, 'user-projects'),
                              #                                      webapp2.Route('/article/edit/<category>/<key>/', ArticleCategoryEditHandler, 'user-projects'),
                              #                                      webapp2.Route('/goals/', GoalHandler, 'user-projects'),
                                                                   ]),
                               #webapp2.Route('/article/<operation:.*?>/<:/?>/', handler=ArticleHandler, name='insert'),
                                #webapp2.Route('/regoals/', handler=GoalHandler, name='edit'),
                               #webapp2.Route('/sign', handler=Guestbook),
                               ], debug=True)
