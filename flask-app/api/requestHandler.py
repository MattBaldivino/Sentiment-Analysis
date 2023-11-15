from flask_restful import Api, Resource, reqparse

class requestHandler(Resource):
  def get(self):
    return {
      'resultStatus': 'SUCCESS',
      'message': "Hello Api Handler"
      }

  def post(self):
    print(self)
    parser = reqparse.RequestParser()
    parser.add_argument('type', type=str)
    parser.add_argument('message', type=str)

    #parser allows us to access variables within a request
    #our parser looks for two arguments - 'type' and 'message' of type string
    args = parser.parse_args()

    print(args)
    # note, the post req from frontend needs to match the strings here (e.g. 'type and 'message')
    request_type = args['type']
    request_json = args['message']
    
    ret_status = request_type
    ret_msg = request_json

    #return json object
    if ret_msg:
      message = "Your Message Requested: {}".format(ret_msg)
    else:
      message = "No Msg"
    
    final_ret = {"status": "Success", "message": message}

    return final_ret