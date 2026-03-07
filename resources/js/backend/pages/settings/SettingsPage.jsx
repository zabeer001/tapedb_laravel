import React, { useEffect, useMemo, useState } from 'react';
import { apiRequest } from '../../../shared/apiClient';

function SettingsPage() {
    const userRole = useMemo(() => localStorage.getItem('role') || 'user', []);
    const [profile, setProfile] = useState(null);
    const [isLoadingProfile, setIsLoadingProfile] = useState(true);
    const [passwordForm, setPasswordForm] = useState({
        current_password: '',
        password: '',
        password_confirmation: '',
    });
    const [avatarFile, setAvatarFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');
    const [passwordMessage, setPasswordMessage] = useState('');
    const [avatarMessage, setAvatarMessage] = useState('');
    const [isSavingPassword, setIsSavingPassword] = useState(false);
    const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);

    useEffect(() => {
        const loadProfile = async () => {
            setIsLoadingProfile(true);
            try {
                const payload = await apiRequest('/api/profile', { auth: true });
                setProfile(payload?.data || null);
            } catch (error) {
                setAvatarMessage(error?.message || 'Failed to load profile.');
            } finally {
                setIsLoadingProfile(false);
            }
        };

        loadProfile();
    }, []);

    useEffect(() => {
        if (!avatarFile) {
            setPreviewUrl('');
            return;
        }

        const url = URL.createObjectURL(avatarFile);
        setPreviewUrl(url);

        return () => URL.revokeObjectURL(url);
    }, [avatarFile]);

    const onPasswordChange = (event) => {
        const { name, value } = event.target;
        setPasswordForm((prev) => ({ ...prev, [name]: value }));
    };

    const onSavePassword = async (event) => {
        event.preventDefault();
        setPasswordMessage('');
        setIsSavingPassword(true);

        try {
            const payload = await apiRequest('/api/profile/password', {
                method: 'POST',
                auth: true,
                body: passwordForm,
            });

            setPasswordMessage(payload?.message || 'Password updated successfully.');
            setPasswordForm({
                current_password: '',
                password: '',
                password_confirmation: '',
            });
        } catch (error) {
            const firstValidationError = Object.values(error?.payload?.errors || {})?.[0]?.[0];
            setPasswordMessage(firstValidationError || error?.message || 'Failed to update password.');
        } finally {
            setIsSavingPassword(false);
        }
    };

    const onUploadAvatar = async (event) => {
        event.preventDefault();
        setAvatarMessage('');

        if (!avatarFile) {
            setAvatarMessage('Please select an image first.');
            return;
        }

        setIsUploadingAvatar(true);
        const body = new FormData();
        body.append('avatar', avatarFile);

        try {
            const payload = await apiRequest('/api/profile/avatar', {
                method: 'POST',
                auth: true,
                body,
            });

            setProfile(payload?.data || null);
            setAvatarMessage(payload?.message || 'Profile image updated successfully.');
            setAvatarFile(null);
        } catch (error) {
            const firstValidationError = Object.values(error?.payload?.errors || {})?.[0]?.[0];
            setAvatarMessage(firstValidationError || error?.message || 'Failed to upload image.');
        } finally {
            setIsUploadingAvatar(false);
        }
    };

    const avatarUrl = previewUrl || profile?.avatar_url || '';
    const passwordSuccess = passwordMessage.toLowerCase().includes('success');
    const avatarSuccess = avatarMessage.toLowerCase().includes('success');

    return (
        <div className="mx-auto max-w-7xl space-y-6">
            <section className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    <h1 className="text-3xl font-extrabold">Settings</h1>
                    <p className="text-sm text-base-content/70">
                        Update account password and profile image. Signed in as:{' '}
                        <span className="font-semibold uppercase">{userRole}</span>
                    </p>
                </div>
            </section>

            <section className="grid gap-6 lg:grid-cols-2">
                <article className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title">Profile Image</h2>
                        <p className="text-sm text-base-content/70">
                            Upload an avatar image (jpg, png, webp, gif up to 2MB).
                        </p>

                        <div className="mt-4 flex items-center gap-4">
                            <div className="avatar">
                                <div className="h-20 w-20 rounded-2xl bg-base-200">
                                    {avatarUrl ? (
                                        <img src={avatarUrl} alt="User avatar" className="h-full w-full object-cover" />
                                    ) : (
                                        <span className="flex h-full w-full items-center justify-center text-sm text-base-content/60">
                                            No image
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="text-sm text-base-content/70">
                                <p className="font-semibold">{profile?.name || 'Current user'}</p>
                                <p>{profile?.email || '-'}</p>
                            </div>
                        </div>

                        <form className="mt-4 space-y-4" onSubmit={onUploadAvatar}>
                            <input
                                type="file"
                                accept="image/*"
                                className="file-input file-input-bordered w-full"
                                onChange={(event) => setAvatarFile(event.target.files?.[0] || null)}
                                disabled={isLoadingProfile || isUploadingAvatar}
                            />

                            {avatarMessage ? (
                                <div className={`alert ${avatarSuccess ? 'alert-success' : 'alert-error'} text-sm`}>
                                    <span>{avatarMessage}</span>
                                </div>
                            ) : null}

                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={isLoadingProfile || isUploadingAvatar}
                            >
                                {isUploadingAvatar ? 'Uploading...' : 'Upload Image'}
                            </button>
                        </form>
                    </div>
                </article>

                <article className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title">Change Password</h2>
                        <p className="text-sm text-base-content/70">
                            Use a strong password with at least 8 characters.
                        </p>

                        <form className="mt-4 space-y-4" onSubmit={onSavePassword}>
                            <label className="form-control">
                                <span className="label-text mb-1">Current password</span>
                                <input
                                    type="password"
                                    name="current_password"
                                    className="input input-bordered w-full"
                                    value={passwordForm.current_password}
                                    onChange={onPasswordChange}
                                    disabled={isSavingPassword}
                                    required
                                />
                            </label>

                            <label className="form-control">
                                <span className="label-text mb-1">New password</span>
                                <input
                                    type="password"
                                    name="password"
                                    className="input input-bordered w-full"
                                    value={passwordForm.password}
                                    onChange={onPasswordChange}
                                    disabled={isSavingPassword}
                                    minLength={8}
                                    required
                                />
                            </label>

                            <label className="form-control">
                                <span className="label-text mb-1">Confirm new password</span>
                                <input
                                    type="password"
                                    name="password_confirmation"
                                    className="input input-bordered w-full"
                                    value={passwordForm.password_confirmation}
                                    onChange={onPasswordChange}
                                    disabled={isSavingPassword}
                                    minLength={8}
                                    required
                                />
                            </label>

                            {passwordMessage ? (
                                <div className={`alert ${passwordSuccess ? 'alert-success' : 'alert-error'} text-sm`}>
                                    <span>{passwordMessage}</span>
                                </div>
                            ) : null}

                            <button type="submit" className="btn btn-primary" disabled={isSavingPassword}>
                                {isSavingPassword ? 'Saving...' : 'Update Password'}
                            </button>
                        </form>
                    </div>
                </article>
            </section>

            {isLoadingProfile ? (
                <div className="text-sm text-base-content/70">
                    Loading profile...
                </div>
            ) : null}
        </div>
    );
}

export default SettingsPage;
