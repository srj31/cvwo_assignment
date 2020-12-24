class Api::V1::TagsController < ApplicationController

    def index
        tag = Tag.find_by(task_id: params[:task_id])
        render json: {tag: tag}
    end

    def show
        tags = Tag.where(name: params[:name])
        tagged_tasks_completed = []
        tagged_tasks_incompleted =[]
        tags.each do |tag|
            task = current_user.tasks.find_by(id: tag.task_id)
            if task
                if task.completed
                    tagged_tasks_completed.push(task)
                else
                    tagged_tasks_incompleted.push(task)
                end
            end
        end
        render json: {tagged_tasks_completed: tagged_tasks_completed , tagged_tasks_incompleted: tagged_tasks_incompleted}
    end

    def create
        @task = current_user.tasks.find(params[:task_id])
        @tag = @task.tags.create(tag_params)
        redirect_to api_v1_tasks_path
    end

    def update
        tag = Tag.find(params[:id])
        if tag.update_attributes!(tag_params)
            render json: { message: "Tag updated successfully" }
        else
            render json: { message: "An error occured" }
        end
    end

    private
        def tag_params
            params.require(:tag).permit(:name, :task_id)
        end

end
