class SessionsController < ApplicationController

    def create
        @user = User.find_by(username: session_params[:username])

        if @user 
            if @user.authenticate(session_params[:password])
                login!
                render json: {
                    logged_in: true,
                    user: @user
                }
            else 
                render json: {
                    status: 401,
                    errors: ['Seems you have entered a wrong password']
                }
            end
        else
            render json: {
                status: 401,
                errors: ['No such user']
            }
        end
    end


    def is_logged_in?
        puts [logged_in?, current_user]
        if logged_in? && current_user
            render json: {
                logged_in: true,
                user: current_user
            }
        else
            render json: {
                logged_in: false,
                message: "no such user"
            } 
        end

    end

    def destroy 
        logout!
        render json: {
            status: 200,
            logged_out: true
        }
    end

    private 

    def session_params
        params.require(:session).permit(:username, :email,:password)
    end

end
