const UserHeader = () => {
    return (
        <div className="flex flex-wrap items-center gap-7 px-4">
            <div className="size-[235px] bg-secondaryLight rounded-full ring-[3px] ring-primaryBlocks border-[15px] border-[#FDFCFA]    "></div>
            <div>
                <h2 className="font-semibold text-2xl mb-7">
                    HR Manager Profile
                </h2>
                <div className="flex items-center gap-4">
                    <div className="bg-primaryBlocks size-[72px] rounded-lg"></div>
                    <div>
                        <span className="text-xl">
                            АО &quot;Халык Банк&quot;
                        </span>
                        <p className="text-black/50">250 сотрудников</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserHeader