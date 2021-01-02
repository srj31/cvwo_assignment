class Api::V1::TasksController < ApplicationController

  before_action :correct_user, only: [:update,:destroy]

  def index
    completed = current_user.tasks.where(completed: true).order(:deadline)
    uncompleted = current_user.tasks.where(completed: false).order(:deadline)
    render json: { completed: completed, uncompleted: uncompleted }
  end

  def update
    todo = Task.find(params[:id])
    if todo.update_attributes!(todo_params)
      render json: { message: "Todo Item updated successfully" }
    else
      render json: { message: "An error occured" }
    end
  end

  def create
    new_todo = current_user.tasks.build(todo_params)
    if new_todo.save
      render json: { id: new_todo.id}
    else
      render json: { errors: new_todo.errors.full_messages , status: 500}
    end
  end

  def show
  end

  def destroy
    todo&.destroy
    render json: { messgae: "Task Deleted"}
  end

  def correct_user
    @task = current_user.tasks.find_by(id: params[:id])
    redirect_to api_v1_tasks_path, notice: "Not Authorised User" if @task.nil?
  end

  private

  def todo_params
    params.require(:task).permit(:id, :name, :description, :completed, :user_id, :deadline)
  end

  def todo
    @todo ||= Task.find(params[:id])
  end
end
