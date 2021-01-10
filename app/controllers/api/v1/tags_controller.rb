class Api::V1::TagsController < ApplicationController

    def index
        tag = Tag.where(task_id: params[:task_id])
        render json: {tag: tag}
    end

    def show
        tags = Tag.where(name: params[:name])
        tagged_tasks_completed = []
        tagged_tasks_uncompleted =[]
        tags.each do |tag|
            task = current_user.tasks.find_by(id: tag.task_id)
            if task
                if task.completed
                    tagged_tasks_completed.push(task)
                else
                    tagged_tasks_uncompleted.push(task)
                end
            end
        end
        render json: {tagged_tasks_completed: tagged_tasks_completed , tagged_tasks_uncompleted: tagged_tasks_uncompleted}
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

    def destroy
        tag&.destroy
        render json: { messgae: "Tag Deleted"}
      end

    private
        def tag_params
            params.require(:tag).permit(:name, :task_id)
        end

        def tag
            @tag ||= Tag.find(params[:id])
        end
end
